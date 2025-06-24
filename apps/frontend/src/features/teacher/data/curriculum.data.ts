// apps/frontend/src/features/teacher/data/curriculum.data.ts

export interface Rubric {
    id: string;
    name: string;
  }
  
  export interface SubStrand {
    id: string;
    name: string;
    rubrics: Rubric[];
  }
  
  export interface Strand {
    id: string;
    name: string;
    subStrands: SubStrand[];
  }
  
  export interface Subject {
    id: string;
    name: string;
    strands: Strand[];
  }
  
  // Mock data for Mathematics
  export const mathematicsCurriculum: Subject = {
    id: 'math',
    name: 'Mathematics',
    strands: [
      {
        id: 'strand_numbers',
        name: 'Numbers',
        subStrands: [
          {
            id: 'substrand_add',
            name: 'Addition',
            rubrics: [
              { id: 'rubric_add_1', name: 'Solves 2-digit addition problems' },
              { id: 'rubric_add_2', name: 'Solves 3-digit addition problems with carrying' },
            ],
          },
          {
            id: 'substrand_sub',
            name: 'Subtraction',
            rubrics: [
              { id: 'rubric_sub_1', name: 'Solves 2-digit subtraction' },
              { id: 'rubric_sub_2', name: 'Solves 3-digit subtraction with borrowing' },
            ],
          },
        ],
      },
      {
        id: 'strand_geometry',
        name: 'Geometry',
        subStrands: [
          {
            id: 'substrand_shapes',
            name: 'Shapes',
            rubrics: [
              { id: 'rubric_shape_1', name: 'Identifies 2D shapes (circle, square, triangle)' },
              { id: 'rubric_shape_2', name: 'Identifies 3D shapes (cube, sphere, cone)' },
            ],
          },
        ],
      },
    ],
  };
  
  export const performanceLevels = [
      { value: 'exceeds', label: 'Exceeds Expectation', color: 'green' },
      { value: 'meets', label: 'Meets Expectation', color: 'blue' },
      { value: 'approaches', label: 'Approaches Expectation', color: 'gold' },
      { value: 'below', label: 'Below Expectation', color: 'volcano' },
  ]