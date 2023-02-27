package com.mfpe.memberService.dto;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ClaimStatusDTOTest {

    
    ClaimStatusDTO claimStatusDTO;
    @Test
     void testClaimStatusDTO() {
        claimStatusDTO = new ClaimStatusDTO();
        claimStatusDTO.setClaimId("C1");
        assertEquals("C1",claimStatusDTO.getClaimId());
       
        claimStatusDTO = new ClaimStatusDTO();
        claimStatusDTO.setClaimStatus("Pending");
        assertEquals("Pending",claimStatusDTO.getClaimStatus());
        
        claimStatusDTO = new ClaimStatusDTO();
        claimStatusDTO.setClaimDescription("Wait for the Approval");
        assertEquals("Wait for the Approval",claimStatusDTO.getClaimDescription());
        
        claimStatusDTO = new ClaimStatusDTO("C2", "Approved", "Your claims has been approved");
        assertEquals("C2",claimStatusDTO.getClaimId());
        assertEquals("Approved",claimStatusDTO.getClaimStatus());
        assertEquals("Your claims has been approved",claimStatusDTO.getClaimDescription());
        		
    }
}
