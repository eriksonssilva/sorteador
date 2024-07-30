package com.jconf.sorteador.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

public class Drawer {

    private List<String> names;

    public Drawer(){

        this.names = new ArrayList<>();

    }

    public String nameDrawer() {

        Random random = new Random();
        int randomIndex = random.nextInt(names.size());

        return names.get(randomIndex);

    }


    public void setNames(String list) {

        String separator = ",";

        String[] itemsArray = list.split(separator);

        names.addAll(Arrays.asList(itemsArray));

    }


    public List<String> getNames() {

        return names;

    }

    public void clearList() {

        names.clear();

    }

}
