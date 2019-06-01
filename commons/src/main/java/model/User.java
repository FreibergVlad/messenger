package model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import utils.UniqueID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Date;
import java.util.Set;

@Data
@Entity
@Table(name = "users")
public class User {

    public User() {
        this.publicUserId = UniqueID.getUniqueId();
    }

    public User(String username, String password,
                Date lastLogin, boolean locked, Set<Role> roles, Set<User> contacts) {
        this.publicUserId = UniqueID.getUniqueId();
        this.username = username;
        this.password = password;
        this.lastLogin = lastLogin;
        this.locked = locked;
        this.roles = roles;
        this.contacts = contacts;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "userID")
    private Long id;

    @Column(unique = true)
    private String publicUserId;

    @Column(unique = true)
    private String username;

    @Column
    @ToString.Exclude
    private String password;

    @Column
    private Date lastLogin;

    @Column
    private boolean locked;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "userID"),
            inverseJoinColumns = @JoinColumn(name = "roleID"))
    private Set<Role> roles;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name ="contacts",
            joinColumns = @JoinColumn(name = "userID"),
            inverseJoinColumns = @JoinColumn(name = "contactID"))
    private Set<User> contacts;

    public UserDTO toDto() {
        return new UserDTO(publicUserId, username);
    }

}
