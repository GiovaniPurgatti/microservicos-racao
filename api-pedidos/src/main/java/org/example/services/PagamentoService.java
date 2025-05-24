package org.example.services;

import org.example.models.Pagamento;
import org.example.repositories.PagamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PagamentoService {
    @Autowired
    private PagamentoRepository pagamentoRepository;

    public Pagamento save(Pagamento pagamento){
        return pagamentoRepository.save(pagamento);
    }
    public List<Pagamento> findAll(){
        return pagamentoRepository.findAll();
    }
    public Optional<Pagamento> findById(Long id) {
        return pagamentoRepository.findById(id);
    }
    public void deleteById(Long id) {
        pagamentoRepository.deleteById(id);
    }
}
