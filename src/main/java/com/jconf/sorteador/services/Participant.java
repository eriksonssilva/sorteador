package com.jconf.sorteador.services;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class Participant {

    private String name;
    @Builder.Default
    private Boolean drawn = Boolean.FALSE;

}
