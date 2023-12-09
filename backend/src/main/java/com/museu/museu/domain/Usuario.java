package com.museu.museu.domain;

import java.util.Collection;

import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@AllArgsConstructor
@Table(name = "tb_usuarios")
@Entity
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String email;
    private String senha;
    @OneToOne
    private Funcionario funcionarios;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "tb_role_usuario",
        joinColumns = { @JoinColumn(name = "usuario_id")},
        inverseJoinColumns = { @JoinColumn(name = "role_id")}
    )
    private Collection<Role> role;

    public Usuario(String email, String senha, Funcionario funcionario, Collection<Role> role) {
        this.email = email;
        this.senha = senha;
        this.funcionarios = funcionario;
        this.role = role;
    }

    
    
    @Override
    public Collection<Role> getAuthorities() {
        return this.role;
    }

    @Override
    public String getPassword() {
        // TODO Auto-generated method stub
        return senha;
    }

    @Override
    public String getUsername() {
        // TODO Auto-generated method stub
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }



    public Integer getId() {
        return id;
    }



    public String getEmail() {
        return this.email;
    }



    public String getSenha() {
        return this.senha;
    }



    public Funcionario getFuncionarios() {
        return this.funcionarios;
    }

}
