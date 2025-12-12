˚
]C:\Users\HP\Desktop\VolmatcaProjects\VolmaticaJobsPortal\ApplicationLayer\Interfaces\IUser.cs
	namespace		 	
ApplicationLayer		
 
.		 

Interfaces		 %
{

 
public 

	interface 
IUser 
{ 
Task 
< 

ResponseVM 
> 
Login 
( 
LoginUserRequest /
user0 4
)4 5
;5 6
Task 
< 

ResponseVM 
> 
AddRecuriter %
(% &
AddUserRequest& 4
user5 9
)9 :
;: ;
Task 
< 

ResponseVM 
> 
GetAllUsers $
($ %
)% &
;& '
Task 
< 

ResponseVM 
> 
GetAllUsersCount )
() *
)* +
;+ ,
Task 
< 

ResponseVM 
> 
GetUserById $
($ %
long% )
id* ,
), -
;- .
Task 
< 

ResponseVM 
> 

UpdateUser #
(# $
UpdateUserRequest$ 5
request6 =
)= >
;> ?
Task 
< 

ResponseVM 
> 
PatchUserAsync '
(' (
PatchUserRequest( 8
request9 @
)@ A
;A B
Task 
< 

ResponseVM 
> 

DeleteUser #
(# $
long$ (
id) +
)+ ,
;, -
Task 
< 

ResponseVM 
> !
UpdateUserStatusAsync .
(. /#
UpdateUserStatusRequest/ F
requestG N
)N O
;O P
} 
} ú
\C:\Users\HP\Desktop\VolmatcaProjects\VolmaticaJobsPortal\ApplicationLayer\Interfaces\IJob.cs
	namespace		 	
ApplicationLayer		
 
.		 

Interfaces		 %
{

 
public 

	interface 
IJob 
{ 
Task 
< 

ResponseVM 
> 
AddJob 
(  
AddJobRequest  -
request. 5
)5 6
;6 7
Task 
< 

ResponseVM 
> 

GetAllJobs #
(# $
)$ %
;% &
Task 
< 

ResponseVM 
> 

GetJobById #
(# $
long$ (
id) +
)+ ,
;, -
Task 
< 

ResponseVM 
> 
	UpdateJob "
(" #
UpdateJobRequest# 3
request4 ;
); <
;< =
Task 
< 

ResponseVM 
> 
	DeleteJob "
(" #
long# '
id( *
)* +
;+ ,
Task 
< 

ResponseVM 
> 
UpdateJobStatus (
(( )"
UpdateJobStatusRequest) ?
request@ G
)G H
;H I
Task 
< 

ResponseVM 
> 
PatchJobAsync &
(& '
PatchJobRequest' 6
request7 >
)> ?
;? @
} 
} À
bC:\Users\HP\Desktop\VolmatcaProjects\VolmaticaJobsPortal\ApplicationLayer\Interfaces\ICandidate.cs
	namespace 	
ApplicationLayer
 
. 

Interfaces %
{ 
public 

	interface 

ICandidate 
{ 
Task 
< 

ResponseVM 
> 
AddCandidate %
(% &
AddCandidateRequest& 9
request: A
)A B
;B C
Task		 
<		 

ResponseVM		 
>		 
GetAllCandidates		 )
(		) *
long		* .
jobId		/ 4
)		4 5
;		5 6
Task

 
<

 

ResponseVM

 
>

 
GetCandidateById

 )
(

) *
long

* .
id

/ 1
)

1 2
;

2 3
Task 
< 

ResponseVM 
> 
UpdateCandidate (
(( )"
UpdateCandidateRequest) ?
request@ G
)G H
;H I
Task 
< 

ResponseVM 
> 
DeleteCandidate (
(( )
long) -
id. 0
)0 1
;1 2
Task 
< 

ResponseVM 
> 
PatchCandidateAsync ,
(, -!
PatchCandidateRequest- B
requestC J
)J K
;K L
Task 
< 

ResponseVM 
> !
PromoteCandidateStage .
(. /
long/ 3
candidateId4 ?
)? @
;@ A
Task 
< 

ResponseVM 
>  
RejectCandidateAsync -
(- ."
RejectCandidateRequest. D
requestE L
)L M
;M N
} 
} ü
rC:\Users\HP\Desktop\VolmatcaProjects\VolmaticaJobsPortal\ApplicationLayer\DTOs\UserDTOs\UpdateUserStatusRequest.cs
	namespace 	
ApplicationLayer
 
. 
DTOs 
.  
UserDTOs  (
{ 
public		 

class		 #
UpdateUserStatusRequest		 (
{

 
public 
long 
Id 
{ 
get 
; 
set !
;! "
}# $
public 
bool 
IsActive 
{ 
get "
;" #
set$ '
;' (
}) *
} 
} ◊
lC:\Users\HP\Desktop\VolmatcaProjects\VolmaticaJobsPortal\ApplicationLayer\DTOs\UserDTOs\UpdateUserRequest.cs
	namespace 	
ApplicationLayer
 
. 
DTOs 
.  
UserDTOs  (
{ 
public		 

class		 
UpdateUserRequest		 "
{

 
public 
long 
Id 
{ 
get 
; 
set !
;! "
}# $
public 
string 
Name 
{ 
get  
;  !
set" %
;% &
}' (
=) *
$str+ -
;- .
public 
string 
Gender 
{ 
get "
;" #
set$ '
;' (
}) *
=+ ,
$str- /
;/ 0
public 
string 
Password 
{  
get! $
;$ %
set& )
;) *
}+ ,
=- .
$str/ 1
;1 2
} 
} ô	
kC:\Users\HP\Desktop\VolmatcaProjects\VolmaticaJobsPortal\ApplicationLayer\DTOs\UserDTOs\PatchUserRequest.cs
	namespace 	
ApplicationLayer
 
. 
DTOs 
.  
UserDTOs  (
{ 
public		 

class		 
PatchUserRequest		 !
{

 
public 
long 
Id 
{ 
get 
; 
set !
;! "
}# $
public 
string 
? 
Name 
{ 
get !
;! "
set# &
;& '
}( )
public 
string 
? 
Gender 
{ 
get  #
;# $
set% (
;( )
}* +
public 
string 
? 
Password 
{  !
get" %
;% &
set' *
;* +
}, -
public 
string 
? 
Role 
{ 
get !
;! "
set# &
;& '
}( )
} 
} ◊

lC:\Users\HP\Desktop\VolmatcaProjects\VolmaticaJobsPortal\ApplicationLayer\DTOs\UserDTOs\LoginUserResponse.cs
	namespace 	
ApplicationLayer
 
. 
DTOs 
.  
UserDTOs  (
{ 
public		 

class		 
LoginUserResponse		 "
{

 
public 
string 
Email 
{ 
set !
;! "
get# &
;& '
}( )
=* +
$str, .
;. /
public 
string 
FullName 
{  
get! $
;$ %
set& )
;) *
}+ ,
=- .
$str/ 1
;1 2
public 
string 
Username 
{  
set! $
;$ %
get& )
;) *
}+ ,
=- .
$str/ 1
;1 2
public 
string 
Role 
{ 
set  
;  !
get" %
;% &
}' (
=) *
$str+ -
;- .
public 
string 
Token 
{ 
set !
;! "
get# &
;& '
}( )
=* +
$str, .
;. /
} 
} ˚
kC:\Users\HP\Desktop\VolmatcaProjects\VolmaticaJobsPortal\ApplicationLayer\DTOs\UserDTOs\LoginUserRequest.cs
	namespace 	
ApplicationLayer
 
. 
DTOs 
.  
UserDTOs  (
{ 
public		 

class		 
LoginUserRequest		 !
{

 
public 
string 
UserName 
{  
get! $
;$ %
set& )
;) *
}+ ,
=- .
$str/ 1
;1 2
public 
string 
Password 
{  
get! $
;$ %
set& )
;) *
}+ ,
=- .
$str/ 1
;1 2
} 
} ˛
jC:\Users\HP\Desktop\VolmatcaProjects\VolmaticaJobsPortal\ApplicationLayer\DTOs\UserDTOs\GetUserResponse.cs
	namespace 	
ApplicationLayer
 
. 
DTOs 
.  
UserDTOs  (
{ 
public		 

class		 
GetUserResponse		  
{

 
public 
long 
Id 
{ 
get 
; 
set !
;! "
}# $
public 
string 
Name 
{ 
get  
;  !
set" %
;% &
}' (
=) *
$str+ -
;- .
public 
string 
Email 
{ 
get !
;! "
set# &
;& '
}( )
=* +
$str, .
;. /
public 
string 
Gender 
{ 
get "
;" #
set$ '
;' (
}) *
=+ ,
$str- /
;/ 0
public 
string 
Role 
{ 
get  
;  !
set" %
;% &
}' (
=) *
$str+ -
;- .
public 
string 
UserName 
{  
get! $
;$ %
set& )
;) *
}+ ,
=- .
$str/ 1
;1 2
public 
bool 
IsActive 
{ 
get "
;" #
set$ '
;' (
}) *
} 
} Ü	
iC:\Users\HP\Desktop\VolmatcaProjects\VolmaticaJobsPortal\ApplicationLayer\DTOs\UserDTOs\AddUserRequest.cs
	namespace 	
ApplicationLayer
 
. 
DTOs 
.  
UserDTOs  (
{ 
public		 

class		 
AddUserRequest		 
{

 
public 
string 
Name 
{ 
get  
;  !
set" %
;% &
}' (
=) *
$str+ -
;- .
public 
string 
Email 
{ 
get !
;! "
set# &
;& '
}( )
=* +
$str, .
;. /
public 
string 
Gender 
{ 
get "
;" #
set$ '
;' (
}) *
=+ ,
$str- /
;/ 0
public 
string 
Password 
{  
get! $
;$ %
set& )
;) *
}+ ,
=- .
$str/ 1
;1 2
} 
} ô
oC:\Users\HP\Desktop\VolmatcaProjects\VolmaticaJobsPortal\ApplicationLayer\DTOs\JobDTO\UpdateJobStatusRequest.cs
	namespace 	
ApplicationLayer
 
. 
DTOs 
.  
JobDTO  &
{ 
public		 

class		 "
UpdateJobStatusRequest		 '
{

 
public 
long 
Id 
{ 
get 
; 
set !
;! "
}# $
public 
bool 
IsActive 
{ 
get "
;" #
set$ '
;' (
}) *
} 
} ù
iC:\Users\HP\Desktop\VolmatcaProjects\VolmaticaJobsPortal\ApplicationLayer\DTOs\JobDTO\UpdateJobRequest.cs
	namespace 	
ApplicationLayer
 
. 
DTOs 
.  
JobDTO  &
{ 
public		 

class		 
UpdateJobRequest		 !
:		! "
AddJobRequest		" /
{

 
public 
long 
Id 
{ 
get 
; 
set !
;! "
}# $
} 
} ¢
hC:\Users\HP\Desktop\VolmatcaProjects\VolmaticaJobsPortal\ApplicationLayer\DTOs\JobDTO\PatchJobRequest.cs
	namespace 	
ApplicationLayer
 
. 
DTOs 
.  
JobDTO  &
{ 
public

 

class

 
PatchJobRequest

  
{ 
public 
long 
Id 
{ 
get 
; 
set !
;! "
}# $
public 
string 
? 
JobName 
{  
get! $
;$ %
set& )
;) *
}+ ,
public 
string 
? 
JobDescription %
{& '
get( +
;+ ,
set- 0
;0 1
}2 3
public 
string 
? 
JobResponsibilities *
{+ ,
get- 0
;0 1
set2 5
;5 6
}7 8
public 
string 
? 
JobQualifications (
{) *
get+ .
;. /
set0 3
;3 4
}5 6
public 
decimal 
? 
MinimumSalary %
{& '
get( +
;+ ,
set- 0
;0 1
}2 3
public 
decimal 
? 
MaximumSalary %
{& '
get( +
;+ ,
set- 0
;0 1
}2 3
public 
int 
? 
InterviewStages #
{$ %
get& )
;) *
set+ .
;. /
}0 1
public 
DateTime 
? 
	StartDate "
{# $
get% (
;( )
set* -
;- .
}/ 0
public 
DateTime 
? 
LastDate !
{" #
get$ '
;' (
set) ,
;, -
}. /
} 
} º
gC:\Users\HP\Desktop\VolmatcaProjects\VolmaticaJobsPortal\ApplicationLayer\DTOs\JobDTO\GetJobResponse.cs
	namespace 	
ApplicationLayer
 
. 
DTOs 
.  
JobDTO  &
{ 
public		 

class		 
GetJobResponse		 
{

 
public 
long 
Id 
{ 
get 
; 
set !
;! "
}# $
public 
string 
JobName 
{ 
get  #
;# $
set% (
;( )
}* +
=, -
$str. 0
;0 1
public 
string 
JobDescription $
{% &
get' *
;* +
set, /
;/ 0
}1 2
=3 4
$str5 7
;7 8
public 
string 
InterviewStage $
{% &
get' *
;* +
set, /
;/ 0
}1 2
=3 4
$str5 7
;7 8
public 
bool 
IsActive 
{ 
get "
;" #
set$ '
;' (
}) *
public 
decimal 
MinimumSalary $
{% &
get' *
;* +
set, /
;/ 0
}1 2
public 
decimal 
MaximumSalary $
{% &
get' *
;* +
set, /
;/ 0
}1 2
} 
} √
fC:\Users\HP\Desktop\VolmatcaProjects\VolmaticaJobsPortal\ApplicationLayer\DTOs\JobDTO\AddJobRequest.cs
	namespace 	
ApplicationLayer
 
. 
DTOs 
.  
JobDTO  &
{ 
public		 

class		 
AddJobRequest		 
{

 
public 
string 
JobName 
{ 
get  #
;# $
set% (
;( )
}* +
=, -
$str. 0
;0 1
public 
string 
JobDescription $
{% &
get' *
;* +
set, /
;/ 0
}1 2
=3 4
$str5 7
;7 8
public 
string 
JobResponsibilities )
{* +
get, /
;/ 0
set1 4
;4 5
}6 7
=8 9
$str: <
;< =
public 
string 
JobQualifications '
{( )
get* -
;- .
set/ 2
;2 3
}4 5
=6 7
$str8 :
;: ;
public 
decimal 
MinimumSalary $
{% &
get' *
;* +
set, /
;/ 0
}1 2
public 
decimal 
MaximumSalary $
{% &
get' *
;* +
set, /
;/ 0
}1 2
public 
int 
InterviewStages "
{# $
get% (
;( )
set* -
;- .
}/ 0
public 
DateTime 
	StartDate !
{" #
get$ '
;' (
set) ,
;, -
}. /
public 
DateTime 
LastDate  
{! "
get# &
;& '
set( +
;+ ,
}- .
} 
} Ó
gC:\Users\HP\Desktop\VolmatcaProjects\VolmaticaJobsPortal\ApplicationLayer\DTOs\CommonDTOs\ResponseVM.cs
	namespace 	
ApplicationLayer
 
. 
DTOs 
.  

CommonDTOs  *
{		 
public

 

class

 

ResponseVM

 
{ 
public 
StatusCodeEnum 
Code "
{# $
get% (
;( )
set* -
;- .
}/ 0
public 
string 
Message 
{ 
get  #
;# $
set% (
;( )
}* +
=, -
$str. 0
;0 1
public 
dynamic 
? 
Data 
{ 
get "
;" #
set$ '
;' (
}) *
} 
} É
{C:\Users\HP\Desktop\VolmatcaProjects\VolmaticaJobsPortal\ApplicationLayer\DTOs\CandidateDTO\UpdateCandidateStatusRequest.cs
	namespace 	
ApplicationLayer
 
. 
DTOs 
.  
CandidateDTO  ,
{ 
public		 

class		 (
UpdateCandidateStatusRequest		 -
{

 
} 
} ÿ	
uC:\Users\HP\Desktop\VolmatcaProjects\VolmaticaJobsPortal\ApplicationLayer\DTOs\CandidateDTO\UpdateCandidateRequest.cs
	namespace 	
ApplicationLayer
 
. 
DTOs 
.  
CandidateDTO  ,
{ 
public		 

class		 "
UpdateCandidateRequest		 '
{

 
public 
long 
Id 
{ 
get 
; 
set !
;! "
}# $
public 
string 
Name 
{ 
get  
;  !
set" %
;% &
}' (
=) *
string+ 1
.1 2
Empty2 7
;7 8
public 
string 
Email 
{ 
get !
;! "
set# &
;& '
}( )
=* +
string, 2
.2 3
Empty3 8
;8 9
public 
string 
ResumeBase64 "
{# $
get% (
;( )
set* -
;- .
}/ 0
=1 2
string3 9
.9 :
Empty: ?
;? @
} 
} ·
uC:\Users\HP\Desktop\VolmatcaProjects\VolmaticaJobsPortal\ApplicationLayer\DTOs\CandidateDTO\RejectCandidateRequest.cs
	namespace 	
ApplicationLayer
 
. 
DTOs 
.  
CandidateDTO  ,
{ 
public		 

class		 "
RejectCandidateRequest		 '
{

 
public 
long 
Id 
{ 
get 
; 
set !
;! "
}# $
public 
string 
ReasonForRejection (
{) *
get+ .
;. /
set0 3
;3 4
}5 6
=7 8
$str9 ;
;; <
} 
} µ	
tC:\Users\HP\Desktop\VolmatcaProjects\VolmaticaJobsPortal\ApplicationLayer\DTOs\CandidateDTO\PatchCandidateRequest.cs
	namespace 	
ApplicationLayer
 
. 
DTOs 
.  
CandidateDTO  ,
{ 
public		 

class		 !
PatchCandidateRequest		 &
{

 
public 
long 
Id 
{ 
get 
; 
set !
;! "
}# $
public 
string 
? 
Name 
{ 
get !
;! "
set# &
;& '
}( )
public 
string 
? 
Email 
{ 
get "
;" #
set$ '
;' (
}) *
public 
string 
? 
ResumeBase64 #
{$ %
get& )
;) *
set+ .
;. /
}0 1
public 
int 
? 
InterviewStage "
{# $
get% (
;( )
set* -
;- .
}/ 0
} 
} ‘
sC:\Users\HP\Desktop\VolmatcaProjects\VolmaticaJobsPortal\ApplicationLayer\DTOs\CandidateDTO\GetCandidateResponse.cs
	namespace 	
ApplicationLayer
 
. 
DTOs 
.  
CandidateDTO  ,
{ 
public		 

class		  
GetCandidateResponse		 %
{

 
public 
long 
Id 
{ 
get 
; 
set !
;! "
}# $
public 
long 
JobId 
{ 
get 
;  
set! $
;$ %
}& '
public 
string 
Name 
{ 
get  
;  !
set" %
;% &
}' (
=) *
string+ 1
.1 2
Empty2 7
;7 8
public 
string 
Email 
{ 
get !
;! "
set# &
;& '
}( )
=* +
string, 2
.2 3
Empty3 8
;8 9
public 
string 
	ResumeURL 
{  !
get" %
;% &
set' *
;* +
}, -
=. /
string0 6
.6 7
Empty7 <
;< =
public 
string 
InterviewStage $
{% &
get' *
;* +
set, /
;/ 0
}1 2
=3 4
$str5 7
;7 8
public 
bool 
IsActive 
{ 
get "
;" #
set$ '
;' (
}) *
} 
} ˜
uC:\Users\HP\Desktop\VolmatcaProjects\VolmaticaJobsPortal\ApplicationLayer\DTOs\CandidateDTO\DeleteCandidateRequest.cs
	namespace 	
ApplicationLayer
 
. 
DTOs 
.  
CandidateDTO  ,
{ 
public		 

class		 "
DeleteCandidateRequest		 '
{

 
} 
} ’	
rC:\Users\HP\Desktop\VolmatcaProjects\VolmaticaJobsPortal\ApplicationLayer\DTOs\CandidateDTO\AddCandidateRequest.cs
	namespace 	
ApplicationLayer
 
. 
DTOs 
.  
CandidateDTO  ,
{ 
public		 

class		 
AddCandidateRequest		 $
{

 
public 
long 
JobId 
{ 
get 
;  
set! $
;$ %
}& '
public 
string 
Name 
{ 
get  
;  !
set" %
;% &
}' (
=) *
string+ 1
.1 2
Empty2 7
;7 8
public 
string 
Email 
{ 
get !
;! "
set# &
;& '
}( )
=* +
string, 2
.2 3
Empty3 8
;8 9
public 
string 
ResumeBase64 "
{# $
get% (
;( )
set* -
;- .
}/ 0
=1 2
string3 9
.9 :
Empty: ?
;? @
} 
} 