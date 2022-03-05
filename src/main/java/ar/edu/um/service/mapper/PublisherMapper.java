package ar.edu.um.service.mapper;

import ar.edu.um.domain.Publisher;
import ar.edu.um.service.dto.PublisherDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Publisher} and its DTO {@link PublisherDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PublisherMapper extends EntityMapper<PublisherDTO, Publisher> {
    @Named("name")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    PublisherDTO toDtoName(Publisher publisher);
}
