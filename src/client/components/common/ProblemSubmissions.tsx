import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableBody,
	styled,
	tableCellClasses,
	TableCell,
} from "@mui/material";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: '#0D1621',
		color: 'white',
        fontWeight: 'bold'
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
        
	},
}));

const rows = [0, 1, 2];

export function ProblemSubmissions() {
	return (
		<section>
			<TableContainer sx = {{backgroundColor: '#0D1621'}}component={Paper}>
				<Table sx={{backgroundColor: '#0D1621'}} aria-label="customized table">
					<TableHead sx={{backgroundColor: '#0D1621'}}>
						<TableRow>
							<StyledTableCell>
								Status
							</StyledTableCell>
							<StyledTableCell >
								Language
							</StyledTableCell>
							<StyledTableCell align="left">
								Memory
							</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody >
						{rows.map((item) => {
							return (
								<TableRow key = {item}>
									<TableCell component="th" scope="row" sx = {{color: '#4ac3ab', fontWeight: 'bold'}}>
										Accepted
									</TableCell>
									<TableCell sx = {{color: 'white'}} >
										Java
									</TableCell>
									<TableCell align="left" sx = {{color: 'white'}}>
										45%
									</TableCell>
								</TableRow>
							);
						})}

					</TableBody>
				</Table>
			</TableContainer>
		</section>
	);
}
