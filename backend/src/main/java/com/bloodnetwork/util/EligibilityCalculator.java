package com.bloodnetwork.util;

import com.bloodnetwork.model.DonorProfile;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Component
public class EligibilityCalculator {

    // Standard waiting period between donations (in days)
    private static final int MIN_DAYS_BETWEEN_DONATIONS = 90;

    public static void calculateEligibility(DonorProfile profile) {
        // Calculate eligibility based on last donation date
        if (profile.getLastDonationDate() != null) {
            long daysSinceLastDonation = ChronoUnit.DAYS.between(profile.getLastDonationDate(), LocalDate.now());
            
            // Standard rule: must wait 90 days between donations
            if (daysSinceLastDonation >= MIN_DAYS_BETWEEN_DONATIONS) {
                profile.setEligibilityStatus(DonorProfile.EligibilityStatus.ELIGIBLE);
                profile.setNextEligibleDate(null); // Eligible now
            } else {
                profile.setEligibilityStatus(DonorProfile.EligibilityStatus.NOT_ELIGIBLE);
                profile.setNextEligibleDate(profile.getLastDonationDate().plusDays(MIN_DAYS_BETWEEN_DONATIONS));
            }
        } else {
            // If no previous donation, donor is eligible
            profile.setEligibilityStatus(DonorProfile.EligibilityStatus.ELIGIBLE);
            profile.setNextEligibleDate(null);
        }
    }
}