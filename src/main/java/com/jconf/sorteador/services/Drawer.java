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

        Participant participant;
        for (int i = 0; i < nameQnt; i++) {

            do {
                int randomIndex = random.nextInt(participants.size());
                participant = participants.get(randomIndex);
            } while (participant.getDrawn() == Boolean.TRUE);
            drawnParticipants.add(participant.getName());
            participant.setDrawn(Boolean.TRUE);

        }

        return drawnParticipants;

    }


    public void setParticipants(String list) {

        String[] participantDetails = list.split(";");

        for (String detail : participantDetails) {

            String[] details = detail.split(",");
            if (details.length == 2) {
                Participant participant = new Participant();
                participant.setName(details[0].trim());
                participant.setEmail(details[1].trim());
                participants.add(participant);
            }

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

            drawList.add(item.getName() + " - " + item.getEmail() + " - " + drawn);

        }

        return drawList;

    }

}
