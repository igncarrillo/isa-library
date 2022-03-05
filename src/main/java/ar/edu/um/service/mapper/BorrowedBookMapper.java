package ar.edu.um.service.mapper;

import ar.edu.um.domain.BorrowedBook;
import ar.edu.um.service.dto.BorrowedBookDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link BorrowedBook} and its DTO {@link BorrowedBookDTO}.
 */
@Mapper(componentModel = "spring", uses = { BookMapper.class, ClientMapper.class })
public interface BorrowedBookMapper extends EntityMapper<BorrowedBookDTO, BorrowedBook> {
    @Mapping(target = "book", source = "book", qualifiedByName = "name")
    @Mapping(target = "client", source = "client", qualifiedByName = "email")
    BorrowedBookDTO toDto(BorrowedBook s);
}
