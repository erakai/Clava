import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button} from '@mui/material'

type ClubProps = {
    name: string,
    description: string
 }

export default function ClubCard({name, description} : ClubProps) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    src="assets/placeholder.png"
                    alt="image failed load"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Edit
                </Button>
            </CardActions>
        </Card>
    )

}