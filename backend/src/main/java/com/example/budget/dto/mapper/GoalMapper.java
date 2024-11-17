package com.example.budget.dto.mapper;

import com.example.budget.dto.GoalDto;
import com.example.budget.entity.Goal;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface GoalMapper {

    GoalMapper INSTANCE = Mappers.getMapper(GoalMapper.class);

    @Mapping(source = "user.id", target = "userId")
    GoalDto goalToGoalDto(Goal goal);
    Goal goalDtoToGoal(GoalDto goalDto);
}
