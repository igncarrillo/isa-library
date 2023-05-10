package ar.edu.um.service.mapper;

import ar.edu.um.domain.Book;
import ar.edu.um.domain.BorrowedBook;
import ar.edu.um.domain.Client;
import ar.edu.um.service.dto.BookDTO;
import ar.edu.um.service.dto.BorrowedBookDTO;
import ar.edu.um.service.dto.ClientDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link BorrowedBook} and its DTO {@link BorrowedBookDTO}.
 */
@Mapper(componentModel = "spring")
public interface BorrowedBookMapper extends EntityMapper<BorrowedBookDTO, BorrowedBook> {
    @Mapping(target = "book", source = "book", qualifiedByName = "bookName")
    @Mapping(target = "client", source = "client", qualifiedByName = "clientEmail")
    BorrowedBookDTO toDto(BorrowedBook s);

    @Named("bookName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    BookDTO toDtoBookName(Book book);

    @Named("clientEmail")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "email", source = "email")
    ClientDTO toDtoClientEmail(Client client);
}
