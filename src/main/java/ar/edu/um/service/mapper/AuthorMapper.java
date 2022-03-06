package ar.edu.um.service.mapper;

import ar.edu.um.domain.Author;
import ar.edu.um.service.dto.AuthorDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Author} and its DTO {@link AuthorDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AuthorMapper extends EntityMapper<AuthorDTO, Author> {
    @Named("name")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    AuthorDTO toDtoName(Author author);
}
