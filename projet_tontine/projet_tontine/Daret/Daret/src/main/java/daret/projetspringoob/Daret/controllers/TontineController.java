package daret.projetspringoob.Daret.controllers;

import daret.projetspringoob.Daret.dto.TontineDto;
import daret.projetspringoob.Daret.dto.UtilisateurDto;
import daret.projetspringoob.Daret.services.TontineService;
import daret.projetspringoob.Daret.services.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8085")
@RequestMapping("/Tontines")
public class TontineController {

    @Autowired
    private TontineService tontineService;
    private UtilisateurService utilisateurService;

    @PostMapping(path = "/AddTontine", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TontineDto> AddTontine(@RequestBody TontineDto tontineDto) {
        TontineDto tontineAjouter= tontineService.addTontine(tontineDto);
        return new ResponseEntity<>(tontineAjouter, HttpStatus.CREATED);
    }
    @GetMapping("GetTontineById/{idTontine}")
    public ResponseEntity<TontineDto> getTontineById(@PathVariable Long idTontine) {
        TontineDto tontineDto = tontineService.ShowTontineById(idTontine);

        if (tontineDto != null) {
            return ResponseEntity.ok(tontineDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("UpdateTontineById/{id}")
    public ResponseEntity<TontineDto> UpdateTontine(@PathVariable Long id, @RequestBody TontineDto tontineDto) {
        TontineDto updatedTontineDto = tontineService.UpdateTontine(id, tontineDto);

        if (updatedTontineDto != null) {
            return ResponseEntity.ok(updatedTontineDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("DeleteTontine/{id}")
    public ResponseEntity<Void> DeleteTontine(@PathVariable Long id) {
        boolean deleted = tontineService.DeleteTontine(id);

        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("ActiverTontine/{id}")
    public ResponseEntity<Void> ActiverTontine(@PathVariable Long id) {
        boolean actived = tontineService.ActiverTontine(id);

        if (actived) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/all")
    public ResponseEntity<List<TontineDto>> getAllTontines() {
        List<TontineDto> tontines = tontineService.listTontines();
        return new ResponseEntity<>(tontines, HttpStatus.OK);
    }

}

