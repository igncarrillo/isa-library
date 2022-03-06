package ar.edu.um.service.mapper;

import ar.edu.um.domain.Book;
import ar.edu.um.service.dto.BookDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Book} and its DTO {@link BookDTO}.
 */
@Mapper(componentModel = "spring", uses = { AuthorMapper.class })
public interface BookMapper extends EntityMapper<BookDTO, Book> {
    @Mapping(target = "author", source = "author", qualifiedByName = "id")
    BookDTO toDto(Book s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    BookDTO toDtoId(Book book);
}
