package validation;

import model.UserDto;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, UserDto> {

   @Override
   public boolean isValid(UserDto userDto, ConstraintValidatorContext constraintValidatorContext) {
      return userDto.getPassword().equals(userDto.getConfirmPassword());
   }
}
