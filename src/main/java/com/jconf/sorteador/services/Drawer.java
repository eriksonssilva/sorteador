package com.jconf.sorteador.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Drawer {

    private final List<Participant> participants;

    public Drawer(){

        this.participants = new ArrayList<>();

    }

    public String nameDrawer(Integer nameQnt) {

        Random random = new Random();
        List<String> drawnParticipants = new ArrayList<>();

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

            return String.join(", ", drawnParticipants);

        } else {

            return "Todos os nomes já foram Sorteados!";

        }

    }


    public void setParticipants(String list) {

        String[] names = list.split(",");

        for (String name : names) {

            Participant participant = Participant.builder().name(name.trim()).build();
            participants.add(participant);

        }

    }


    public void clearList() {

        participants.clear();

    }

    public List<String> updateList() {

        List<String> notDrawnYet = new ArrayList<>();

        for (Participant participant : participants) {

            notDrawnYet.add(participant.getName());
            if (participant.getDrawn() == Boolean.TRUE) {

                notDrawnYet.remove(participant.getName());

            }

        }

        return notDrawnYet;

    }

}
