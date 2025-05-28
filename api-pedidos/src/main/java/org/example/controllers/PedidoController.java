package org.example.controllers;

import org.example.models.Pedido;
import org.example.services.PedidoService;
import org.example.constants.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping(Constant.API_CLIENT)
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"}, allowCredentials = "true")
public class PedidoController {
    private static final Logger logger = LoggerFactory.getLogger(PedidoController.class);
    private static final Random random = new Random();

    @Autowired
    private PedidoService pedidoService;

    private String gerarStatusAleatorio() {
        String[] status = {"PENDENTE", "APROVADO", "REJEITADO"};
        return status[random.nextInt(status.length)];
    }

    @PostMapping
    public ResponseEntity<Pedido> createPedido(@RequestBody Pedido pedido) {
        try {
            logger.info("Criando novo pedido: {}", pedido);
            pedido.setStatus(gerarStatusAleatorio());
            Pedido savedPedido = pedidoService.save(pedido);
            logger.info("Pedido criado com sucesso: {}", savedPedido);
            return ResponseEntity.ok(savedPedido);
        } catch (Exception e) {
            logger.error("Erro ao criar pedido", e);
            throw e;
        }
    }

    @GetMapping
    public ResponseEntity<List<Pedido>> getAllPedidos() {
        try {
            logger.info("Buscando todos os pedidos");
            List<Pedido> pedidos = pedidoService.findAll();
            logger.info("Pedidos encontrados: {}", pedidos.size());
            return ResponseEntity.ok(pedidos);
        } catch (Exception e) {
            logger.error("Erro ao buscar todos os pedidos", e);
            throw e;
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> getPedidoById(@PathVariable Long id) {
        try {
            logger.info("Buscando pedido com ID: {}", id);
            return pedidoService.findById(id)
                    .map(pedido -> {
                        logger.info("Pedido encontrado: {}", pedido);
                        return ResponseEntity.ok(pedido);
                    })
                    .orElseGet(() -> {
                        logger.warn("Pedido não encontrado com ID: {}", id);
                        return ResponseEntity.notFound().build();
                    });
        } catch (Exception e) {
            logger.error("Erro ao buscar pedido por ID: {}", id, e);
            throw e;
        }
    }

    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<List<Pedido>> getPedidosByClienteId(@PathVariable Long clienteId) {
        try {
            logger.info("Buscando pedidos do cliente: {}", clienteId);
            List<Pedido> pedidos = pedidoService.findByClienteId(clienteId);
            logger.info("Pedidos encontrados para o cliente {}: {}", clienteId, pedidos.size());
            return ResponseEntity.ok(pedidos);
        } catch (Exception e) {
            logger.error("Erro ao buscar pedidos do cliente: {}", clienteId, e);
            throw e;
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePedido(@PathVariable Long id) {
        try {
            logger.info("Deletando pedido com ID: {}", id);
            pedidoService.deleteById(id);
            logger.info("Pedido deletado com sucesso: {}", id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.error("Erro ao deletar pedido: {}", id, e);
            throw e;
        }
    }
}
