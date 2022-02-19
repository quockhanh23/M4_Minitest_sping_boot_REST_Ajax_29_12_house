package com.example.demo.controller;


import com.example.demo.model.Category;
import com.example.demo.model.House;
import com.example.demo.service.CategoryServiceImpl;
import com.example.demo.service.HouseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/houses")
public class HouseRestController {
    @Autowired
    private CategoryServiceImpl categoryService;
    @Autowired
    private HouseServiceImpl houseService;

    @GetMapping("/categories")
    public ResponseEntity<Iterable<Category>> findAllCategory() {
        Iterable<Category> categories = categoryService.findAll();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<Iterable<House>> findAllHouse() {
        Iterable<House> houses = houseService.findAll();
        return new ResponseEntity<>(houses, HttpStatus.OK);
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<Optional<House>> findOne(@PathVariable Long id) {
        Optional<House> houses = houseService.findById(id);
        return new ResponseEntity<>(houses, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<House> findHouseById(@PathVariable Long id) {
        Optional<House> house = houseService.findById(id);
        if (!house.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(house.get(), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<House> saveHouse(@RequestBody House house) {
        houseService.save(house);
        return new ResponseEntity<>(house, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<House> updateHouse(@PathVariable Long id, @RequestBody House house) {
        Optional<House> house1 = houseService.findById(id);
        house.setId(house1.get().getId());
        houseService.save(house);
        return new ResponseEntity<>(house1.get(), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<House> deleteHouse(@PathVariable Long id) {
        Optional<House> house = houseService.findById(id);
        if (!house.isPresent()) {
            return new ResponseEntity<>(house.get(), HttpStatus.NOT_FOUND);
        }
        houseService.remove(id);
        return new ResponseEntity<>(house.get(), HttpStatus.NO_CONTENT);
    }
    @GetMapping("/find")
    public ResponseEntity<Iterable<House>> findStudentOther(String name) {
        Iterable<House> students;
        if (name == null) {
            students = houseService.orderByName();
        } else {
            students = houseService.findByNameContaining(name);
        }
        return new ResponseEntity<>(students, HttpStatus.OK);
    }
    @GetMapping("/findCategory1")
    public ResponseEntity<Iterable<House>> findCategory1(String name) {
        Iterable<House> students;
        if (name == null) {
            students = houseService.category1();
        } else {
            students = houseService.findByNameContaining(name);
        }
        return new ResponseEntity<>(students, HttpStatus.OK);
    }
    @GetMapping("/findCategory2")
    public ResponseEntity<Iterable<House>> findCategory2(String name) {
        Iterable<House> students;
        if (name == null) {
            students = houseService.category2();
        } else {
            students = houseService.findByNameContaining(name);
        }
        return new ResponseEntity<>(students, HttpStatus.OK);
    }
    @GetMapping("/findBathroom")
    public ResponseEntity<Iterable<House>> findBathroomMoreThan2(String name) {
        Iterable<House> students;
        if (name == null) {
            students = houseService.findBathroom();
        } else {
            students = houseService.findByNameContaining(name);
        }
        return new ResponseEntity<>(students, HttpStatus.OK);
    }
}
