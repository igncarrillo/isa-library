package ar.edu.um.service.mapper;

import ar.edu.um.domain.Author;
import ar.edu.um.domain.Book;
import ar.edu.um.service.dto.AuthorDTO;
import ar.edu.um.service.dto.BookDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Book} and its DTO {@link BookDTO}.
 */
@Mapper(componentModel = "spring")
public interface BookMapper extends EntityMapper<BookDTO, Book> {
    @Mapping(target = "authors", source = "authors", qualifiedByName = "authorNameSet")
    BookDTO toDto(Book s);

    @Mapping(target = "removeAuthor", ignore = true)
    Book toEntity(BookDTO bookDTO);

    @Named("authorName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    AuthorDTO toDtoAuthorName(Author author);

    @Named("authorNameSet")
    default Set<AuthorDTO> toDtoAuthorNameSet(Set<Author> author) {
        return author.stream().map(this::toDtoAuthorName).collect(Collectors.toSet());
    }
}
