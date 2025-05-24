package org.example.models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String Nome;
    private String Email;
    private String Senha;


    public String getNome() { return Nome;}

    public void setNome(String nome) { Nome = nome;}

    public String getEmail() {return Email;}

    public void setEmail(String telefone) {Email = telefone;}

    public String getSenha() {return Senha;}

    public void setSenha(String senha) {
        Senha = senha;
    }
}
