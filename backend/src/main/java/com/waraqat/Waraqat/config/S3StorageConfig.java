package com.waraqat.Waraqat.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.AwsCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class S3StorageConfig {

    @Value("${aws.s3.access-key}")
    private String s3AccessKey;

    @Value("${aws.s3.secret-key}")
    private String s3SecretKey;

    @Bean
    public S3Client generateS3Client(){
        AwsCredentials awsCredentials =  AwsBasicCredentials.create(s3AccessKey,s3SecretKey);
        S3Client s3Client = S3Client.builder()
                .region(Region.ME_SOUTH_1)
                .credentialsProvider(StaticCredentialsProvider.create(awsCredentials))
                .build();

        return s3Client;

    }
}
