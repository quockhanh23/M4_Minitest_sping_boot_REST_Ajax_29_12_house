package com.example.demo.service;


import com.example.demo.model.House;
import com.example.demo.repository.HouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HouseServiceImpl implements HouseService {
    @Autowired
    private HouseRepository houseRepository;

    @Override
    public Iterable<House> findAll() {
        return houseRepository.findAll();
    }

    @Override
    public Optional<House> findById(Long id) {
        return houseRepository.findById(id);
    }

    @Override
    public void save(House house) {
        houseRepository.save(house);
    }

    @Override
    public void remove(Long id) {
        houseRepository.deleteById(id);
    }

    @Override
    public Iterable<House> orderByName() {
        return houseRepository.orderByName();
    }

    @Override
    public List<House> findByNameContaining(String name) {
        return houseRepository.findByNameContaining(name);
    }

    @Override
    public Iterable<House> category1() {
        return houseRepository.category1();
    }

    @Override
    public Iterable<House> category2() {
        return houseRepository.category2();
    }

    @Override
    public Iterable<House> findBathroom() {
        return houseRepository.findBathroom();
    }
}
