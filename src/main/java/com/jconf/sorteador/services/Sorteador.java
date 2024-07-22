package com.jconf.sorteador.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

public class Sorteador {

    List<String> names = new ArrayList<>();

    public String namePicker() {

        Random random = new Random();
        int randomIndex = random.nextInt(names.size());

        return names.get(randomIndex);

    }

    public void addName(String name) {

        names.add(name);
        System.out.println(names);

    }

    public void addList(String list) {

        String separator = ",";

        String[] itemsArray = list.split(separator);

        names = new ArrayList<>(Arrays.asList(itemsArray));

    }

}
