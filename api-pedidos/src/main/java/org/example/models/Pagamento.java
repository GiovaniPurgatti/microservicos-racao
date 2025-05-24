package org.example.models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class Pagamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long PedidoID;

    public Long getPedidoID() {
        return PedidoID;
    }

    public void setPedidoID(Long pedidoID) {
        PedidoID = pedidoID;
    }
}
