package com.jconf.sorteador.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Drawer {

    private final List<Participant> participants;


    public Drawer(){

        this.participants = new ArrayList<>();

    }

    public List<String> nameDrawer(Integer nameQnt) {

        Random random = new Random();
        List<String> drawnParticipants = new ArrayList<>();;

        Integer namesLeft = 0;
        for (Participant participant : participants) {
            if (!participant.getDrawn()) {
                namesLeft++;
            }
        }

        Participant participant;

        if (namesLeft > 0) {

            if (nameQnt > namesLeft) {
                nameQnt = namesLeft;
            }
            for (int i = 0; i < nameQnt; i++) {

                do {
                    int randomIndex = random.nextInt(participants.size());
                    participant = participants.get(randomIndex);
                } while (participant.getDrawn() == Boolean.TRUE);

                drawnParticipants.add(participant.getName());
                participant.setDrawn(Boolean.TRUE);

            }
        }

        return drawnParticipants;

    }


    public void setParticipants(String list) {

        String[] names = list.split(",");

        for (String name : names) {

            Participant participant = new Participant();
            participant.setName(name);
            participants.add(participant);

        }

    }


    public void clearList() {

        participants.clear();

    }

    public List<String> updateList() {

        List<String> drawList = new ArrayList<>();
        String drawn;

        for (Participant item : participants) {

            if (item.getDrawn() == Boolean.TRUE) {

                drawn = "Sorteado";

            } else {

                drawn = "Ok";

            }

            drawList.add(item.getName() + " - " + drawn);

        }

        return drawList;

    }

}
