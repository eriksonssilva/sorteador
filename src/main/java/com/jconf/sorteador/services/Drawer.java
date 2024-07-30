package com.jconf.sorteador.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

public class Drawer {

    private List<Participant> participants;

    public Drawer(){

        this.participants = new ArrayList<>();

    }

    public String nameDrawer() {

        Random random = new Random();
        Participant participant;

        do {
            int randomIndex = random.nextInt(participants.size());
            participant = participants.get(randomIndex);
        } while (participant.getDrawn() == Boolean.TRUE);

        participant.setDrawn(Boolean.TRUE);
        return participant.getName();

    }


    public void setNames(String list) {

        String[] participantDetails = list.split(";");

        for (String detail : participantDetails) {

            String[] details = detail.split(",");
            if (details.length == 2) {
                Participant participant = new Participant();
                participant.setName(details[0]);
                participant.setEmail(details[1]);
                participants.add(participant);
            }

        }

    }


    public List<Participant> getNames() {

        return participants;

    }

    public void clearList() {

        participants.clear();

    }

}
