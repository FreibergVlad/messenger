package com.freiberg.authserver.model;

import com.freiberg.authserver.validation.PasswordMatches;
import com.freiberg.authserver.validation.UsernameUnique;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@PasswordMatches
public class RegistrationDTO {

    @NotNull(message = "Username must be not null!")
    @NotEmpty(message = "Username must be not empty!")
    @Length(min = 5, message = "Username must contains at least 5 symbols")
    @UsernameUnique
    private String username;

    @NotNull(message = "Password must be not null!")
    @Length(min = 10, message = "Password must contains at least 10 symbols")
    @NotEmpty
    private String password;

    @NotNull
    @NotEmpty
    private String confirmPassword;

}
