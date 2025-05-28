package org.example.service;

import org.example.model.Produto;
import java.util.List;
import java.util.Optional;

public interface ProdutoService {
    List<Produto> getAll();
    Optional<Produto> getById(Long id);
    Produto create(Produto produto);
    Optional<Produto> update(Long id, Produto produto);
    boolean delete(Long id);
} 