package com.waraqat.Waraqat.services.serviceImpl;

import com.waraqat.Waraqat.services.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

@Component
public class S3ServiceImpl implements S3Service {

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    @Autowired
    private final S3Client s3Client;

    public S3ServiceImpl(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    @Override
    public String uploadArticleImages(MultipartFile multipartFile) throws IOException {
        File convertedFilesObj = convertMultiPartFileToFile(multipartFile);
        String fileName = System.currentTimeMillis() + "_" + multipartFile.getOriginalFilename();

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .build();

        s3Client.putObject(putObjectRequest, RequestBody.fromFile(convertedFilesObj));

        // Delete the temporary file
        convertedFilesObj.delete();

        // Return the S3 URL of the uploaded image
        return "https://" + bucketName + ".s3.me-south-1.amazonaws.com/" + fileName;
    }

    private File convertMultiPartFileToFile(MultipartFile multipartFile) throws IOException {
        File convertFile = new File(multipartFile.getOriginalFilename());

        try (FileOutputStream fos = new FileOutputStream(convertFile)){
            fos.write(multipartFile.getBytes());
        }catch (IOException e){
            System.err.println("error converting multipart to file" + e);
        }
        return convertFile;
    }

}
