package org.example.service.impl;

import org.example.model.Produto;
import org.example.repository.ProdutoRepository;
import org.example.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoServiceImpl implements ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Override
    public List<Produto> getAll() {
        return produtoRepository.findAll();
    }

    @Override
    public Optional<Produto> getById(Long id) {
        return produtoRepository.findById(id);
    }

    @Override
    public Produto create(Produto produto) {
        return produtoRepository.save(produto);
    }

    @Override
    public Optional<Produto> update(Long id, Produto produto) {
        return produtoRepository.findById(id)
                .map(existingProduto -> {
                    produto.setId(id);
                    return produtoRepository.save(produto);
                });
    }

    @Override
    public boolean delete(Long id) {
        return produtoRepository.findById(id)
                .map(produto -> {
                    produtoRepository.delete(produto);
                    return true;
                })
                .orElse(false);
    }
} 