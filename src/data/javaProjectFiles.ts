export interface JavaFile {
  id: string;
  filename: string;
  category: 'Controller' | 'Entity' | 'Service' | 'Utility' | 'Config' | 'Build';
  description: string;
  code: string;
}

export const JAVA_PROJECT_FILES: JavaFile[] = [
  {
    id: 'calculator',
    filename: 'CadastralAreaCalculator.java',
    category: 'Utility',
    description: 'Core cadastral mathematical engine & SHA-256 cryptographic deed token generation in Java.',
    code: `package com.bhoomi.cadastre.util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * CadastralAreaCalculator - Civic Cadastre Digitalization Algorithm
 * Author: Mayuresh Tapase (Student Reg No: 172)
 * Course: Computer Engineering Mini-Project
 */
public class CadastralAreaCalculator {

    // 1 Acre = 43,560 Square Feet
    public static final double SQ_FT_PER_ACRE = 43560.0;
    
    // 1 Square Foot = 0.092903 Square Meters
    public static final double SQ_METERS_PER_SQ_FT = 0.092903;

    /**
     * Compute total square footage from rectangular / quadrilateral frontage & breadth
     */
    public static double computeSquareFeet(double lengthFt, double widthFt) {
        if (lengthFt <= 0 || widthFt <= 0) {
            throw new IllegalArgumentException("Dimensions must be positive values.");
        }
        return lengthFt * widthFt;
    }

    /**
     * Convert square feet into standard Cadastral Acres
     */
    public static double computeAcres(double squareFeet) {
        if (squareFeet <= 0) return 0.0;
        double acres = squareFeet / SQ_FT_PER_ACRE;
        // Round to 2 decimal places as per Maharashtra Land Revenue Code standards
        return Math.round(acres * 100.0) / 100.0;
    }

    /**
     * Convert square feet into metric square meters
     */
    public static double computeSquareMeters(double squareFeet) {
        return Math.round((squareFeet * SQ_METERS_PER_SQ_FT) * 10.0) / 10.0;
    }

    /**
     * Generate an immutable SHA-256 deed verification hash from land record parameters
     */
    public static String generateDeedHash(String surveyNo, String owner, double acreage, String timestamp) {
        String rawData = surveyNo + ":" + owner + ":" + acreage + ":" + timestamp + ":BHOOMI-MH-2026";
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] encodedHash = digest.digest(rawData.getBytes(StandardCharsets.UTF_8));
            
            StringBuilder hexString = new StringBuilder("0x");
            for (byte b : encodedHash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 cryptographic algorithm not supported in this JVM", e);
        }
    }
}`
  },
  {
    id: 'controller',
    filename: 'LandRecordController.java',
    category: 'Controller',
    description: 'Spring Boot REST Controller handling plot registration, queries, and certificate verification.',
    code: `package com.bhoomi.cadastre.controller;

import com.bhoomi.cadastre.model.LandRecord;
import com.bhoomi.cadastre.service.LandRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/land")
@CrossOrigin(origins = "*")
public class LandRecordController {

    private final LandRecordService landRecordService;

    @Autowired
    public LandRecordController(LandRecordService landRecordService) {
        this.landRecordService = landRecordService;
    }

    /**
     * GET /api/v1/land - List all registered cadastre parcels
     */
    @GetMapping
    public ResponseEntity<List<LandRecord>> getAllRecords() {
        List<LandRecord> records = landRecordService.findAllRecords();
        return ResponseEntity.ok(records);
    }

    /**
     * GET /api/v1/land/{id} - Get parcel extract by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<LandRecord> getRecordById(@PathVariable String id) {
        return landRecordService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * POST /api/v1/land/register - Digitize and register a new land parcel
     */
    @PostMapping("/register")
    public ResponseEntity<LandRecord> registerLandRecord(@RequestBody LandRecord request) {
        // Automatically compute dimensions, acreage, and SHA-256 deed token
        LandRecord saved = landRecordService.createLandRecord(request);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    /**
     * GET /api/v1/land/verify/{deedHash} - Audit deed integrity
     */
    @GetMapping("/verify/{deedHash}")
    public ResponseEntity<Boolean> verifyDeedIntegrity(@PathVariable String deedHash) {
        boolean isValid = landRecordService.verifyDeedToken(deedHash);
        return ResponseEntity.ok(isValid);
    }
}`
  },
  {
    id: 'entity',
    filename: 'LandRecord.java',
    category: 'Entity',
    description: 'JPA persistence entity modeling the ISO-19152 cadastral parcel standard.',
    code: `package com.bhoomi.cadastre.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "land_records")
public class LandRecord implements Serializable {

    @Id
    @Column(name = "parcel_id", length = 32)
    private String id;

    @Column(name = "survey_number", nullable = false)
    private String surveyNo;

    @Column(name = "plot_identifier")
    private String plotIdentifier;

    @Column(name = "district_city", nullable = false)
    private String districtCity;

    @Column(name = "village")
    private String village;

    @Column(name = "plot_length_ft", nullable = false)
    private double length;

    @Column(name = "plot_width_ft", nullable = false)
    private double width;

    @Column(name = "total_area_sq_ft", nullable = false)
    private double totalAreaSqFt;

    @Column(name = "total_area_acres", nullable = false)
    private double totalAreaAcres;

    @Column(name = "estimated_value_inr")
    private double estimatedValue;

    @Column(name = "zoning_type")
    private String zoning;

    @Column(name = "blockchain_deed_hash", unique = true, length = 66)
    private String blockchainHash;

    @Column(name = "certificate_number", unique = true)
    private String certificateNo;

    @Column(name = "registration_date")
    private LocalDate registrationDate;

    @Column(name = "geo_center")
    private String geoCenter;

    // Default Constructor for JPA
    public LandRecord() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getSurveyNo() { return surveyNo; }
    public void setSurveyNo(String surveyNo) { this.surveyNo = surveyNo; }

    public String getPlotIdentifier() { return plotIdentifier; }
    public void setPlotIdentifier(String plotIdentifier) { this.plotIdentifier = plotIdentifier; }

    public String getDistrictCity() { return districtCity; }
    public void setDistrictCity(String districtCity) { this.districtCity = districtCity; }

    public String getVillage() { return village; }
    public void setVillage(String village) { this.village = village; }

    public double getLength() { return length; }
    public void setLength(double length) { this.length = length; }

    public double getWidth() { return width; }
    public void setWidth(double width) { this.width = width; }

    public double getTotalAreaSqFt() { return totalAreaSqFt; }
    public void setTotalAreaSqFt(double totalAreaSqFt) { this.totalAreaSqFt = totalAreaSqFt; }

    public double getTotalAreaAcres() { return totalAreaAcres; }
    public void setTotalAreaAcres(double totalAreaAcres) { this.totalAreaAcres = totalAreaAcres; }

    public double getEstimatedValue() { return estimatedValue; }
    public void setEstimatedValue(double estimatedValue) { this.estimatedValue = estimatedValue; }

    public String getZoning() { return zoning; }
    public void setZoning(String zoning) { this.zoning = zoning; }

    public String getBlockchainHash() { return blockchainHash; }
    public void setBlockchainHash(String blockchainHash) { this.blockchainHash = blockchainHash; }

    public String getCertificateNo() { return certificateNo; }
    public void setCertificateNo(String certificateNo) { this.certificateNo = certificateNo; }

    public LocalDate getRegistrationDate() { return registrationDate; }
    public void setRegistrationDate(LocalDate registrationDate) { this.registrationDate = registrationDate; }

    public String getGeoCenter() { return geoCenter; }
    public void setGeoCenter(String geoCenter) { this.geoCenter = geoCenter; }
}`
  },
  {
    id: 'service',
    filename: 'LandRecordService.java',
    category: 'Service',
    description: 'Spring service layer implementing transaction boundaries and business workflows.',
    code: `package com.bhoomi.cadastre.service;

import com.bhoomi.cadastre.model.LandRecord;
import com.bhoomi.cadastre.repository.LandRecordRepository;
import com.bhoomi.cadastre.util.CadastralAreaCalculator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class LandRecordService {

    private final LandRecordRepository repository;

    @Autowired
    public LandRecordService(LandRecordRepository repository) {
        this.repository = repository;
    }

    public List<LandRecord> findAllRecords() {
        return repository.findAll();
    }

    public Optional<LandRecord> findById(String id) {
        return repository.findById(id);
    }

    public LandRecord createLandRecord(LandRecord record) {
        // 1. Compute physical spatial area
        double sqFt = CadastralAreaCalculator.computeSquareFeet(record.getLength(), record.getWidth());
        double acres = CadastralAreaCalculator.computeAcres(sqFt);

        record.setTotalAreaSqFt(sqFt);
        record.setTotalAreaAcres(acres);

        // 2. Set defaults if not provided
        if (record.getId() == null || record.getId().isEmpty()) {
            record.setId("LND-MH-2026-" + (int)(Math.random() * 9000 + 1000));
        }
        if (record.getRegistrationDate() == null) {
            record.setRegistrationDate(LocalDate.now());
        }
        if (record.getCertificateNo() == null) {
            record.setCertificateNo("#ACAD-BHM-" + (int)(Math.random() * 9000 + 1000));
        }
        if (record.getGeoCenter() == null) {
            record.setGeoCenter("18.5204° N, 73.8567° E");
        }

        // 3. Cryptographically seal record with SHA-256 token
        String deedHash = CadastralAreaCalculator.generateDeedHash(
            record.getSurveyNo(),
            "Mayuresh Tapase",
            record.getTotalAreaAcres(),
            record.getRegistrationDate().toString()
        );
        record.setBlockchainHash(deedHash);

        return repository.save(record);
    }

    public boolean verifyDeedToken(String hash) {
        return repository.existsByBlockchainHash(hash);
    }
}`
  },
  {
    id: 'app',
    filename: 'BhoomiApplication.java',
    category: 'Build',
    description: 'Main Spring Boot bootstrap class with embedded Tomcat web server.',
    code: `package com.bhoomi.cadastre;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Bhoomi Digital Land Registry & Cadastral Portal
 * Computer Engineering Academic Project
 * Author: Mayuresh Tapase
 */
@SpringBootApplication
public class BhoomiApplication {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("  Bhoomi Digital Land Registry - Spring Boot v3.2 ");
        System.out.println("  Civic Cadastre Management System Module MH-712  ");
        System.out.println("==================================================");
        
        SpringApplication.run(BhoomiApplication.class, args);
    }
}`
  },
  {
    id: 'pom',
    filename: 'pom.xml',
    category: 'Build',
    description: 'Maven Project Object Model dependencies and build plugins.',
    code: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.3</version>
        <relativePath/>
    </parent>
    
    <groupId>com.bhoomi</groupId>
    <artifactId>cadastre-registry</artifactId>
    <version>2.4.0</version>
    <name>Bhoomi Cadastre Portal</name>
    <description>Digital Land Registry &amp; Cadastral Portal Academic Project</description>

    <properties>
        <java.version>17</java.version>
    </properties>

    <dependencies>
        <!-- Spring Boot Web for REST APIs -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Data JPA for Database Persistence -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- PostgreSQL Database Driver -->
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- H2 In-Memory Database for rapid student testing -->
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- Spring Boot Testing -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>`
  },
  {
    id: 'properties',
    filename: 'application.properties',
    category: 'Config',
    description: 'Spring Boot runtime configuration properties and DB connection credentials.',
    code: `# Server Configuration
server.port=8080
server.servlet.context-path=/bhoomi

# Application Metadata
spring.application.name=Bhoomi Cadastre Portal
bhoomi.author=Mayuresh Tapase
bhoomi.student-reg-no=172

# Database Configuration (PostgreSQL / H2 fallback for testing)
spring.datasource.url=jdbc:postgresql://localhost:5432/bhoomi_cadastre
spring.datasource.username=postgres
spring.datasource.password=postgres_secret
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA / Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect`
  }
];
