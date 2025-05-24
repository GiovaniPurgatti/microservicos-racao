package org.example.services;

import org.example.models.Produto;
import org.example.repositories.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {
    @Autowired
    private ProdutoRepository produtoRepository;

    public Produto save(Produto produto){
        return produtoRepository.save(produto);
    }
    public List<Produto> findAll(){
        return produtoRepository.findAll();
    }
    public Optional<Produto> findById(Long id) {
        return produtoRepository.findById(id);
    }
    public void deleteById(Long id) {
        produtoRepository.deleteById(id);
    }
}
