package ar.edu.um.service.mapper;

import ar.edu.um.domain.Book;
import ar.edu.um.service.dto.BookDTO;
import java.util.Set;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Book} and its DTO {@link BookDTO}.
 */
@Mapper(componentModel = "spring", uses = { PublisherMapper.class, AuthorMapper.class })
public interface BookMapper extends EntityMapper<BookDTO, Book> {
    @Mapping(target = "publisher", source = "publisher", qualifiedByName = "name")
    @Mapping(target = "authors", source = "authors", qualifiedByName = "firstNameSet")
    BookDTO toDto(Book s);

    @Mapping(target = "removeAuthor", ignore = true)
    Book toEntity(BookDTO bookDTO);

    @Named("name")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    BookDTO toDtoName(Book book);
}
