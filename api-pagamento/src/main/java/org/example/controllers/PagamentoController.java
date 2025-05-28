package org.example.controllers;

import org.example.models.Pagamento;
import org.example.repositories.PagamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/pagamentos")
public class PagamentoController {
    private static final Logger logger = LoggerFactory.getLogger(PagamentoController.class);

    @Autowired
    private PagamentoRepository pagamentoRepository;

    @PostMapping
    public ResponseEntity<?> criarPagamento(@RequestBody Pagamento pagamento) {
        logger.info("Recebendo requisição de pagamento: {}", pagamento);
        
        Map<String, String> errors = new HashMap<>();
        
        if (pagamento.getPedidoId() == null) {
            errors.put("pedidoId", "O ID do pedido é obrigatório");
            logger.warn("pedidoId está nulo");
        }
        if (pagamento.getValor() == null) {
            errors.put("valor", "O valor é obrigatório");
            logger.warn("valor está nulo");
        }
        if (pagamento.getMetodoPagamento() == null) {
            errors.put("metodoPagamento", "O método de pagamento é obrigatório");
            logger.warn("metodoPagamento está nulo");
        }
        
        if (!errors.isEmpty()) {
            logger.error("Erros de validação: {}", errors);
            return ResponseEntity.badRequest().body(errors);
        }
        
        pagamento.setStatus(Pagamento.StatusPagamento.PENDENTE);
        pagamento.setDataPagamento(LocalDateTime.now());
        Pagamento saved = pagamentoRepository.save(pagamento);
        logger.info("Pagamento criado com sucesso: {}", saved);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pagamento> getPagamento(@PathVariable Long id) {
        return pagamentoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/pedido/{pedidoId}")
    public ResponseEntity<Pagamento> getPagamentoByPedidoId(@PathVariable Long pedidoId) {
        Pagamento pagamento = pagamentoRepository.findByPedidoId(pedidoId);
        if (pagamento != null) {
            return ResponseEntity.ok(pagamento);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<Pagamento>> getAllPagamentos() {
        return ResponseEntity.ok(pagamentoRepository.findAll());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Pagamento> atualizarStatus(
            @PathVariable Long id,
            @RequestParam Pagamento.StatusPagamento status) {
        return pagamentoRepository.findById(id)
                .map(pagamento -> {
                    pagamento.setStatus(status);
                    return ResponseEntity.ok(pagamentoRepository.save(pagamento));
                })
                .orElse(ResponseEntity.notFound().build());
    }
} 