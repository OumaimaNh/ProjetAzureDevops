package daret.projetspringoob.Daret.controllers;

import daret.projetspringoob.Daret.dto.TourDto;
import daret.projetspringoob.Daret.services.TourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Tour")
public class TourController {

    @Autowired
    private TourService tourService;

    @PostMapping("/AddTour")
    public ResponseEntity<TourDto> addTour(@RequestBody TourDto tourDto) {
        TourDto addedTour = tourService.addTour(tourDto);
        return ResponseEntity.ok(addedTour);
    }

    @PutMapping("/UpdateTour/{idTour}")
    public ResponseEntity<TourDto> updateTour(@PathVariable Long idTour, @RequestBody TourDto tourDto) {
        tourDto.setId_tour(idTour);
        TourDto updatedTour = tourService.UpdateTour(tourDto);
        return ResponseEntity.ok(updatedTour);
    }

    @DeleteMapping("/DeleteTour/{idTour}")
    public ResponseEntity<Boolean> deleteTour(@PathVariable Long idTour) {
        Boolean isDeleted = tourService.DeleteTour(idTour);
        return ResponseEntity.ok(isDeleted);
    }

    @GetMapping("/showTour/{idTour}")
    public ResponseEntity<TourDto> ShowTourById(@PathVariable Long idTour) {
        TourDto tourDto = tourService.ShowTourById(idTour);
        return ResponseEntity.ok(tourDto);
    }

}
