package com.waraqat.Waraqat.security;

import com.waraqat.Waraqat.exceptions.ErrorResponse;
import com.waraqat.Waraqat.exceptions.UserNotFoundException;
import com.waraqat.Waraqat.services.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {
    // before we get to the controllers we intercept the request to see if there is a token within the header

    private final JwtService jwtService;
    private final ApplicationContext applicationContext;

    @Autowired
    public JwtFilter(final JwtService service, final ApplicationContext context){
        this.jwtService = service;
        this.applicationContext = context;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = getTokenFromRequest(request);
            System.out.println("JWT Token: " + token);

            if (token == null) {
                filterChain.doFilter(request, response);
                return;
            }

            String username = jwtService.extractUserName(token);
            System.out.println("Extracted username (email): " + username);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = applicationContext
                        .getBean(UserDetailsService.class)
                        .loadUserByUsername(username);
                System.out.println("UserDetails username: " + userDetails.getUsername());

                if (jwtService.validateToken(token, userDetails)) {
                    System.out.println("Token validated for user: " + username);
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );

                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
            filterChain.doFilter(request, response);
        } catch (Exception e) {

            System.err.println("JwtFilter error: " + e.getMessage());
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    private String getTokenFromRequest(HttpServletRequest request) throws ServletException {
        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return null;
        }
        return authorizationHeader.substring(7);
    }
}
