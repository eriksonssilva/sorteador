package com.jconf.sorteador.controllers;

import org.springframework.web.bind.annotation.*;
import com.jconf.sorteador.services.Sorteador;

@RestController
@RequestMapping("/")
public class APICall {

    Sorteador picker = new Sorteador();

    @CrossOrigin(origins = "http://localhost:8080")
    @GetMapping("sorteador")
    public String sorteador() {

        return "O sortudo foi: " + picker.namePicker();
    }

    @CrossOrigin(origins = "http://localhost:8080")
    @PostMapping("adicionarUm")
    public void adicionarUm(@RequestParam("single") String single) {

        picker.addName(single);

    }

    @CrossOrigin(origins = "http://localhost:8080")
    @PostMapping("adicionarLista")
    public void adicionarLista(@RequestParam("list") String list) {

        picker.addList(list);

    }
}