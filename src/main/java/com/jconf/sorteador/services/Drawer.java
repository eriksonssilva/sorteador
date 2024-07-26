package com.jconf.sorteador.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

public class Drawer {

    List<String> names = new ArrayList<>();

    public String nameDrawer() {

        Random random = new Random();
        int randomIndex = random.nextInt(names.size());

        return names.get(randomIndex);

    }


    public void add(String list) {

        String separator = ",";

        String[] itemsArray = list.split(separator);

        names = new ArrayList<>(Arrays.asList(itemsArray));

    }

    public void clearList() {

        names.clear();

    }

    public List<String> printList() {

        return names;

    }

}
