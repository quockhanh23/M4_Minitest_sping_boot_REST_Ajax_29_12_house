package com.example.demo.repository;

import com.example.demo.model.House;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HouseRepository extends JpaRepository<House, Long> {
    List<House> findByNameContaining(String name);
    @Modifying
    @Query(value = "select * from house order by name;", nativeQuery = true)
    Iterable<House> orderByName();
    @Modifying
    @Query(value = "select * from house where category_id = 1;", nativeQuery = true)
    Iterable<House> category1();
    @Modifying
    @Query(value = "select * from house where category_id = 2;", nativeQuery = true)
    Iterable<House> category2();
    @Modifying
    @Query(value = "select * from house where bathroom > 2", nativeQuery = true)
    Iterable<House> findBathroom();

}
