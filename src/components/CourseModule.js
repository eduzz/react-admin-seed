import React from 'react';
import LessonCard from './LessonCard';

const CourseModule = () => (
	<ul className='collapsible card-lessons' data-collapsible='accordion'>
		<li>
			<div className='card-lessons-header collapsible-header active'>
				<h3 className='card-lessons-title'>Entendendo a interface do Photoshop</h3>
				<div className='card-lessons-resume'>
					<span>Duração do curso</span>
					<span>Número de Aulas</span>
				</div>
			</div>

			<div className='card-lessons-wrapper collapsible-body'>
				<a className='button affirmative waves-effect waves-light'><span>Nova Aula</span></a>
				<LessonCard />
			</div>
		</li>
	</ul>
);

export default CourseModule;