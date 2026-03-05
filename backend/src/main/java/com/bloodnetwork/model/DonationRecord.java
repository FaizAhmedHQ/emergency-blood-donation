package com.bloodnetwork.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "donationRecords")
public class DonationRecord {
    @Id
    private String id;
    
    private String donorId;
    
    private String hospitalId;
    
    private String donationType; // BLOOD, ORGAN
    
    private LocalDateTime date;
    
    private String status; // COMPLETED, FAILED, PENDING
    
    private String notes;
}