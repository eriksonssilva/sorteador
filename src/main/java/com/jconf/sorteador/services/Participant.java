package com.jconf.sorteador.services;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Participant {

    private String name;
    private Boolean drawn = Boolean.FALSE;

}
