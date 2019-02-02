package model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import validation.PasswordMatches;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@PasswordMatches
public class UserDto {

    @NotNull(message = "Username must be not null!")
    @NotEmpty(message = "Username must be not empty!")
    @Length(min = 5, message = "Username must contains at least 5 symbols")
    private String username;

    @NotNull(message = "Password must be not null!")
    @Length(min = 10, message = "Password must contains at least 10 symbols")
    @NotEmpty
    private String password;

    @NotNull
    @NotEmpty
    private String confirmPassword;

}
