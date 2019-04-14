package com.freiberg.authserver.validation;

import com.freiberg.authserver.model.RegistrationDTO;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, RegistrationDTO> {

   @Override
   public boolean isValid(RegistrationDTO registrationDTO, ConstraintValidatorContext constraintValidatorContext) {
      return registrationDTO.getPassword().equals(registrationDTO.getConfirmPassword());
   }
}
