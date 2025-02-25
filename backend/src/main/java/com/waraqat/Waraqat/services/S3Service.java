package com.waraqat.Waraqat.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public interface S3Service {

    String uploadArticleImages(MultipartFile multipartFile) throws IOException;

}
