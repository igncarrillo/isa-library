package ar.edu.um.service.mapper;

import static org.junit.jupiter.api.Assertions.*;

import ar.edu.um.domain.Author;
import ar.edu.um.service.dto.AuthorDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AuthorMapperTest {

    private AuthorMapper authorMapper;

    @BeforeEach
    public void setUp() {
        authorMapper = new AuthorMapperImpl();
    }

    @Test
    public void testNullAuthorToEntity() {
        Author author = authorMapper.toEntity((AuthorDTO) null);

        assertNull(author);
    }

    @Test
    public void testAuthorToEntity() {
        AuthorDTO dto = new AuthorDTO(null, "test author");

        Author author = authorMapper.toEntity(dto);

        assertNotNull(author);
        assertEquals("test author", author.getName());
    }

    @Test
    public void testPartialUpdate() {
        Author author = new Author();
        AuthorDTO dto = new AuthorDTO(null, "updated name");
        authorMapper.partialUpdate(author, dto);

        assertEquals(author.getName(), "updated name");
    }
}
