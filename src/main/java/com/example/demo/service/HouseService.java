package com.example.demo.service;


import com.example.demo.model.House;

import java.util.List;

public interface HouseService extends GeneralService<House>{
    Iterable<House> orderByName();
    List<House> findByNameContaining(String name);
    Iterable<House> category1();
    Iterable<House> category2();
    Iterable<House> findBathroom();
}
