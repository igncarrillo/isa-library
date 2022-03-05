package ar.edu.um.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class BorrowedBookMapperTest {

    private BorrowedBookMapper borrowedBookMapper;

    @BeforeEach
    public void setUp() {
        borrowedBookMapper = new BorrowedBookMapperImpl();
    }
}
