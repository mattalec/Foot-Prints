{% extends 'base.html' %}

{% block head %}

<title>Footfallprints</title>

{% endblock %}

{% block body %}



<div class='content'>
	<table border='1px'>
		

		{% if scripts|length < 1 %}

			<th><h1>Foot-fall-prints</h1></th>
			<tr><td><h4>You have completed all scripts.</h4></td></tr>

		{% else %}

			<th id='footprints' class='col-change' colspan="10"><h1>Foot-Prints</h1></th>
			<tr id='table-head'>
				<td class='smaller bleu' id='dob'>Item no.</td>
				<td class='big bleu' id='name'>Medication</td>
				<td class='smaller bleu' id='dosage'>Dosage</td>
				<td class='smaller bleu' id='quantity'>Quantity</td>
				<td class='smaller bleu' id='success'>Done</td>
				<td class='smaller rouge' id='error'>Error</td>
				<td class='smaller orange'>early</td>
				<td class='smaller orange'>never requested</td>
				<td class='smaller orange'>not pt</td>
				<td class='smaller orange'>adverse reactions</td>
			</tr>

			{% for script in scripts %}

				{# if first new name #}
				{% if loop.index0 == 0 %}
					<tr id='break-blank'  class='{{ script[1].pt_no }}'><td class='requested' colspan='6'>Requested: {{ script[1].date }}</td></tr>
					<tr id='break' class='{{ script[1].pt_no }}'><td class='col-change' colspan='10'></td></tr>
					<tr id='first-row' class='{{ script[1].pt_no }}'>
						<td class='smaller'>{{script[1].dob}}</td>
						<td class='big'>{{script[1].full_name}}</td>
						<td class='email smaller' colspan='2'>{{script[1].email}}</td>
						<!--<td>Requested: {{script[1].date}}</td>-->
						<td class='smaller'><div class='success-button'><input type='button' class='success-button' id='all-success-button-{{ script[1].pt_no }}' onclick='AllDone({{ script[1].pt_no }})' value='All Done'/></div></td>
						<td class='smaller'><input type='button' class='error-button' id='all-error-button-{{ script[1].pt_no }}' onclick='AllError({{ script[1].pt_no }})' value='X'></td>
						<td class='error-options smaller all-error-options-{{ script[1].pt_no }}'><input type='checkbox'></td>
						<td class='error-options smaller all-error-options-{{ script[1].pt_no }}'><input type='checkbox'></td>
						<td class='error-options smaller all-error-options-{{ script[1].pt_no }}'><input type='checkbox'></td>
						<td class='error-options smaller all-error-options-{{ script[1].pt_no }}'><input type='checkbox'></td>
					</tr>
					<tr id='break'><td class='col-change' colspan='10'></td></tr>

				{% elif (script[1].full_name != scripts[script[0]-1][1].full_name) or (script[1].dob != scripts[script[0]-1][1].dob) %}
				{# if not first new name #}
					<tr id='break-blank' class='{{ script[1].pt_no }}'><td class='requested' colspan='6'>Requested: {{ script[1].date }}</td></tr>
					<tr id='break' class='{{ script[1].pt_no }}'><td class='col-change' colspan='10'></td></tr>	
					<tr id='first-row' class='{{ script[1].pt_no }}'>
						<td>{{script[1].dob}}</td>
						<td>{{script[1].full_name}}</td>
						<td class='email' colspan='2'>{{script[1].email}}</td>
						<!--<td>Requested: {{script[1].date}}</td>-->
						<td class='small'><div class='success-button'><input type='button' class='success-button' id='all-success-button-{{ script[1].pt_no }}' onclick='AllDone({{ script[1].pt_no }})' value='All Done'/></div></td>
						<td class='small'><input type='button' class='error-button' id='all-error-button-{{ script[1].pt_no }}' onclick='AllError({{ script[1].pt_no }})' value='X'></td>
						<td class='smaller error-options all-error-options-{{ script[1].pt_no }}'><input type='checkbox'></td>
						<td class='smaller error-options all-error-options-{{ script[1].pt_no }}'><input type='checkbox'></td>
						<td class='smaller error-options all-error-options-{{ script[1].pt_no }}'><input type='checkbox'></td>
						<td class='smaller error-options all-error-options-{{ script[1].pt_no }}'><input type='checkbox'></td>					
					</tr>
					<tr id='break'><td class='col-change' colspan='10'></td></tr>
					
				{% endif %}
				

				{# load prescriptions #}
				<tr class='{{ script[1].pt_no }}'>
					<td class='smaller'>{{ script[1].pt_ind + 1 }})</td>
					<td class='medication'>{{ script[1].medication }}</td>
					<td>{{ script[1].dosage }}</td>
					<td>{{ script[1].quantity }}</td>
					<td class='small'><input type='button' class='success-button success-pt-{{ script[1].pt_no }}' id='success-button-{{ script[0] }}' onclick='Done({{ script[0] }})' value='Done'/></td>
					<td class='small'><input type='button' class='error-button error-pt-{{ script[1].pt_no }}' id='error-button-{{ script[0] }}' onclick='Error({{ script[0] }})' value='X'/></td>
					<td class='smaller error-options error-option-{{ script[0] }}'><input id='checkbox-1-{{ script[0] }}' type='checkbox'></td>
					<td class='smaller error-options error-option-{{ script[0] }}'><input id='checkbox-1-{{ script[0] }}' type='checkbox'></td>
					<td class='smaller error-options error-option-{{ script[0] }}'><input id='checkbox-1-{{ script[0] }}' type='checkbox'></td>
					<td class='smaller error-options error-option-{{ script[0] }}'><input id='checkbox-1-{{ script[0] }}' type='checkbox'></td>
				</tr>

		{% endfor %}
<!--
		<tr>
			<th>Task</th>
			<th>Added</th>
			<th>Actions</th>
		</tr>
		{% for task in tasks %}
			<tr>
				<td>{{ task.content }}</td>
				<td>{{ task.date_created.date() }}</td>
				<td>
					<a href="/delete/{{task.id}}">Delete</a>
					<br>
					<a href="/update/{{task.id}}">Update</a>
				</td>
			</tr>
			</tr>
		{% endfor %}
		{% endif %}

		<tr>
			<td colspan="3">
				<form action="/" method='POST'>
					<input type='text' name='content' id='content'>
					<input type='submit' value='Add Task'>
				</form>
			</td>
		</tr>-->
	</table>

				
</div>

{% endblock %}