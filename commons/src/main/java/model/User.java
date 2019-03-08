package model;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "userID")
    private Long id;

    @Column
    private String username;

    @Column
    @ToString.Exclude
    private String password;

    @Column
    private Timestamp lastLogin;

    @Column
    private boolean locked;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "userID"),
            inverseJoinColumns = @JoinColumn(name = "roleID"))
    private Set<Role> roles;

    @ManyToMany
    @JoinTable(name ="contacts",
            joinColumns = @JoinColumn(name = "userID"),
            inverseJoinColumns = @JoinColumn(name = "contactID"))
    private Set<User> contacts;

    @ManyToMany
    @JoinTable(name = "contacts",
            joinColumns = @JoinColumn(name = "contactID"),
            inverseJoinColumns = @JoinColumn(name = "userID"))
    private Set<User> contactOf;

}
